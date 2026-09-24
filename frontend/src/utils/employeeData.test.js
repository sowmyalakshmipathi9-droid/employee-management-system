import test from 'node:test';
import assert from 'node:assert/strict';
import { getEmployeeFormDefaults, normalizeEmployeeRecord } from './employeeData.js';

test('default employee form captures the full schema', () => {
  const defaults = getEmployeeFormDefaults();

  assert.deepEqual(defaults, {
    id: '',
    employee_code: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    department_id: '',
    designation: '',
    salary: '',
    joining_date: '',
    profile_image: '',
    status: 'Active',
    created_at: '',
  });
});

test('normalizeEmployeeRecord fills missing fields without exposing raw keys', () => {
  const normalized = normalizeEmployeeRecord({
    id: 7,
    employee_code: 'EMP2026007',
    first_name: 'Sudarshan',
    email: 'sudarshan.gowda@gmail.com',
    department_id: 3,
    department_name: 'Finance',
  });

  assert.equal(normalized.id, 7);
  assert.equal(normalized.employee_code, 'EMP2026007');
  assert.equal(normalized.first_name, 'Sudarshan');
  assert.equal(normalized.last_name, '');
  assert.equal(normalized.department_name, 'Finance');
  assert.equal(normalized.status, 'Active');
});
