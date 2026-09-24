# SauceDemo Login – Test Cases

## Module

Login

## Application

SauceDemo

## Objective

Verify that users can successfully authenticate with valid credentials and that the application handles invalid credentials, locked accounts, missing input, and invalid user states correctly.

---

## Test Data

| User             | Username                  | Password         | Expected Result                                    |
| ---------------- | ------------------------- | ---------------- | -------------------------------------------------- |
| Standard User    | `standard_user`           | `secret_sauce`   | Login successful                                   |
| Locked User      | `locked_out_user`         | `secret_sauce`   | Login rejected                                     |
| Problem User     | `problem_user`            | `secret_sauce`   | Login successful                                   |
| Performance User | `performance_glitch_user` | `secret_sauce`   | Login successful, with potential performance delay |
| Invalid User     | `invalid_user`            | `secret_sauce`   | Login rejected                                     |
| Invalid Password | `standard_user`           | `wrong_password` | Login rejected                                     |

---

# Positive Test Cases

### TC_LOGIN_001 – Login with valid standard user credentials

**Priority:** High
**Type:** Positive

**Preconditions:**

* User is on the SauceDemo login page.

**Steps:**

1. Enter `standard_user` in the Username field.
2. Enter `secret_sauce` in the Password field.
3. Click the Login button.

**Expected Result:**

* User is successfully authenticated.
* User is redirected to the Products/Inventory page.
* Products page is displayed.

---

### TC_LOGIN_002 – Login with valid problem user credentials

**Priority:** Medium
**Type:** Positive

**Steps:**

1. Enter `problem_user` as Username.
2. Enter `secret_sauce` as Password.
3. Click Login.

**Expected Result:**

* Login is successful.
* User is redirected to the Products page.

---

### TC_LOGIN_003 – Login with valid performance glitch user credentials

**Priority:** Medium
**Type:** Positive

**Steps:**

1. Enter `performance_glitch_user`.
2. Enter `secret_sauce`.
3. Click Login.

**Expected Result:**

* User is eventually logged in.
* Products page is displayed.
* The test should not fail merely because the login takes longer than the standard user flow.

---

# Negative Test Cases

### TC_LOGIN_004 – Login with invalid username

**Priority:** High
**Type:** Negative

**Steps:**

1. Enter `invalid_user` as Username.
2. Enter `secret_sauce` as Password.
3. Click Login.

**Expected Result:**

* Login is rejected.
* User remains on the login page.
* Appropriate authentication error message is displayed.

---

### TC_LOGIN_005 – Login with invalid password

**Priority:** High
**Type:** Negative

**Steps:**

1. Enter `standard_user` as Username.
2. Enter `wrong_password` as Password.
3. Click Login.

**Expected Result:**

* Login is rejected.
* User remains on the login page.
* Appropriate authentication error message is displayed.

---

### TC_LOGIN_006 – Login with both username and password invalid

**Priority:** High
**Type:** Negative

**Steps:**

1. Enter an invalid username.
2. Enter an invalid password.
3. Click Login.

**Expected Result:**

* Login is rejected.
* User remains on the login page.
* Authentication error message is displayed.

---

### TC_LOGIN_007 – Login with empty username

**Priority:** High
**Type:** Negative

**Steps:**

1. Leave Username empty.
2. Enter `secret_sauce` as Password.
3. Click Login.

**Expected Result:**

* Login is rejected.
* User remains on the login page.
* Validation message indicates that Username is required.

---

### TC_LOGIN_008 – Login with empty password

**Priority:** High
**Type:** Negative

**Steps:**

1. Enter `standard_user` as Username.
2. Leave Password empty.
3. Click Login.

**Expected Result:**

* Login is rejected.
* User remains on the login page.
* Validation message indicates that Password is required.

---

### TC_LOGIN_009 – Login with both fields empty

**Priority:** High
**Type:** Negative

**Steps:**

1. Leave Username empty.
2. Leave Password empty.
3. Click Login.

**Expected Result:**

* Login is rejected.
* User remains on the login page.
* Validation message indicates that Username is required.

---

### TC_LOGIN_010 – Login using locked-out user

**Priority:** High
**Type:** Negative

**Steps:**

1. Enter `locked_out_user` as Username.
2. Enter `secret_sauce` as Password.
3. Click Login.

**Expected Result:**

* Authentication is rejected.
* User remains on the login page.
* Locked-out account error message is displayed.

---

### TC_LOGIN_011 – Verify password is masked

**Priority:** Medium
**Type:** Validation

**Steps:**

1. Enter any password into the Password field.

**Expected Result:**

* Password characters are masked.
* Password should not be displayed as plain text.

---

### TC_LOGIN_012 – Verify login page remains usable after failed login

**Priority:** Medium
**Type:** Negative / Usability

**Steps:**

1. Enter invalid credentials.
2. Click Login.
3. Observe the login page.

**Expected Result:**

* Error message is displayed.
* Username and Password fields remain available.
* User can correct the credentials and attempt login again.

---

## Test Coverage Summary

| Category               | Test Cases |
| ---------------------- | ---------: |
| Positive               |          3 |
| Negative               |          7 |
| Validation / Usability |          2 |
| **Total**              |     **12** |

## Priority Summary

| Priority | Count |
| -------- | ----: |
| High     |     8 |
| Medium   |     4 |

## Notes

* Authentication error messages should be validated against the actual application behavior.
* Performance-related behavior for `performance_glitch_user` should be tested without introducing arbitrary fixed waits.
* Security testing such as SQL injection and XSS should be covered separately as part of the application's broader security test strategy rather than treated as normal functional login tests.
