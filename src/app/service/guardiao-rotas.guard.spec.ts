import { TestBed, async, inject } from '@angular/core/testing';

import { GuardiaoRotasGuard } from './guardiao-rotas.guard';

describe('GuardiaoRotasGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuardiaoRotasGuard]
    });
  });

  it('should ...', inject([GuardiaoRotasGuard], (guard: GuardiaoRotasGuard) => {
    expect(guard).toBeTruthy();
  }));
});
