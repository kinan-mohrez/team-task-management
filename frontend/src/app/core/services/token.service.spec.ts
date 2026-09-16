import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;
  let storage: Map<string, string>;

  const tokenKey = 'access_token';

  beforeEach(() => {
    storage = new Map<string, string>();

    // Keep every storage operation in memory; Jasmine restores these spies.
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      storage.set(key, value);
    });
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return storage.has(key) ? storage.get(key)! : null;
    });
    spyOn(localStorage, 'removeItem').and.callFake((key: string) => {
      storage.delete(key);
    });

    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setToken', () => {
    it('should store the token under the access_token key', () => {
      service.setToken('header.payload.signature');

      expect(localStorage.setItem).toHaveBeenCalledOnceWith(
        tokenKey,
        'header.payload.signature',
      );
      expect(storage.get(tokenKey)).toBe('header.payload.signature');
    });

    it('should replace an existing token', () => {
      storage.set(tokenKey, 'old-token');

      service.setToken('new-token');

      expect(storage.get(tokenKey)).toBe('new-token');
    });

    it('should store an empty token without removing the entry', () => {
      storage.set(tokenKey, 'old-token');

      service.setToken('');

      expect(storage.has(tokenKey)).toBeTrue();
      expect(storage.get(tokenKey)).toBe('');
    });

    it('should preserve whitespace and special characters', () => {
      const token = '  token+/=._-  ';

      service.setToken(token);

      expect(storage.get(tokenKey)).toBe(token);
    });

    it('should propagate storage write errors', () => {
      const error = new Error('Storage write failed');
      (localStorage.setItem as jasmine.Spy).and.callFake(() => {
        throw error;
      });

      expect(() => service.setToken('token')).toThrow(error);
    });
  });

  describe('getToken', () => {
    it('should retrieve the stored token using the access_token key', () => {
      storage.set(tokenKey, 'stored-token');

      expect(service.getToken()).toBe('stored-token');
      expect(localStorage.getItem).toHaveBeenCalledOnceWith(tokenKey);
    });

    it('should return null when no token is stored', () => {
      expect(service.getToken()).toBeNull();
    });

    it('should return an empty string when an empty token is stored', () => {
      storage.set(tokenKey, '');

      expect(service.getToken()).toBe('');
    });

    it('should propagate storage read errors', () => {
      const error = new Error('Storage read failed');
      (localStorage.getItem as jasmine.Spy).and.callFake(() => {
        throw error;
      });

      expect(() => service.getToken()).toThrow(error);
    });
  });

  describe('removeToken', () => {
    it('should remove the token and preserve unrelated storage entries', () => {
      storage.set(tokenKey, 'stored-token');
      storage.set('theme', 'dark');

      service.removeToken();

      expect(localStorage.removeItem).toHaveBeenCalledOnceWith(tokenKey);
      expect(storage.has(tokenKey)).toBeFalse();
      expect(storage.get('theme')).toBe('dark');
    });

    it('should allow repeated removal when no token is stored', () => {
      expect(() => {
        service.removeToken();
        service.removeToken();
      }).not.toThrow();
      expect(storage.has(tokenKey)).toBeFalse();
    });

    it('should remove an empty token entry', () => {
      storage.set(tokenKey, '');

      service.removeToken();

      expect(storage.has(tokenKey)).toBeFalse();
    });

    it('should propagate storage removal errors', () => {
      const error = new Error('Storage removal failed');
      (localStorage.removeItem as jasmine.Spy).and.callFake(() => {
        throw error;
      });

      expect(() => service.removeToken()).toThrow(error);
    });
  });

  describe('hasToken', () => {
    it('should return false when no token is stored', () => {
      expect(service.hasToken()).toBeFalse();
    });

    it('should return false when an empty token is stored', () => {
      storage.set(tokenKey, '');

      expect(service.hasToken()).toBeFalse();
    });

    it('should return true when a token is stored', () => {
      storage.set(tokenKey, 'stored-token');

      expect(service.hasToken()).toBeTrue();
    });

    it('should treat whitespace as a present token without trimming it', () => {
      storage.set(tokenKey, '   ');

      expect(service.hasToken()).toBeTrue();
    });

    it('should treat the string "0" as a present token', () => {
      storage.set(tokenKey, '0');

      expect(service.hasToken()).toBeTrue();
    });

    it('should propagate storage read errors', () => {
      const error = new Error('Storage read failed');
      (localStorage.getItem as jasmine.Spy).and.callFake(() => {
        throw error;
      });

      expect(() => service.hasToken()).toThrow(error);
    });
  });

  it('should reflect the token lifecycle across all public methods', () => {
    expect(service.getToken()).toBeNull();
    expect(service.hasToken()).toBeFalse();

    service.setToken('first-token');
    expect(service.getToken()).toBe('first-token');
    expect(service.hasToken()).toBeTrue();

    service.setToken('replacement-token');
    expect(service.getToken()).toBe('replacement-token');

    service.removeToken();
    expect(service.getToken()).toBeNull();
    expect(service.hasToken()).toBeFalse();
  });
});
