## User Stories

- **UserRegistration**

  Should register an user given an uuid, nickname, firstname, lastname, phone, email and password.

  The user created will receive a welcome email.

- **UserToken**

  Should return a [JWT](https://jwt.io) given an email and password valids of an User.

- **Profile**

  Should returns a user info (given his uuid from token) that contains a uuid, nickname, firstname, lastname, phone and email.

- **UpdateProfile**

  Should partial update user profile (given his uuid from token) could update his nickname, firstname, lastname and phone.

- **ChangePassword**

  Should update user password (given his uuid from token) given the old password and the new password, both in base64.

- **GlobalUserHistory**

  Should return a registries list of user _(given his uuid from token)_ movements about his charges, debts and payments in ascending order.

  In this list each item will contains a contact uuid, date of movement and old and new status with theirs [currency](https://www.iso.org/iso-4217-currency-codes.html) and quantity.

  Available statuses:

  - DEBT_RECEIVED & PAYMENT_RECEIVED
  - DEBT_SENT & PAYMENT_SENT
  - DEBT_EXPIRED & PAYMENT_EXPIRED
  - DEBT_COMPLETED & PAYMENT_COMPLETED

- **UserContacts**

  Should return a contacts list of user (given his uuid from token).

  In this list each item will contains a contact uuid, nickname, firstname, lastname and the total amount of debt owed to him.

- **UserContactHistory**

  Should return a registries list about movements between a contact (given his uuid) and user (given his uuid from token).

  In this list each item will keep the same status and logic as the _GlobalUserHistory user history_.

- **ContactRequest**

  Should send a contact request given a existent user nickname and optional messsage.

- **ContactRequests**

  Should return a list of pending contact requests of user (given his uuid from token).

  In this list each item contains a contact request uuid, contact nickname, contact fullname, a contact request date and an optional message.

- **ConfirmContactRequest**

  Should confirm a contact request given his uuid.

  The contact requester will receive a notification and could to interactive with his new contact.

  This contact request will disappear off list of pending contact request of both contacts.

- **DenyContactRequest**

  Should deny a contact request given his uuid.

  The contact requester won't receive a notification and could'nt to interactive with the contact.

  This contact request will disappear off list of pending contact request of user (given his uuid from token).

- **NewDebtRequest**

  Should send a debt request to a contact of user (given his uuid from token) given his uuid, concept (description), initial date, limit date (3 months by default), [currency](https://www.iso.org/iso-4217-currency-codes.html) and amount (max. 2 decimals).

  The contact will receive a notification for confirm or deny debt.

- **DebtRequests**

  Should return a list of pending debts requests of user (given his uuid from token).

  In this list each item contains a contact debt request payload.

- **ConfirmDebtRequest**

  Should confirm a debt request from contact this debt it'll be added into _UserContactHistory list_ and contact requester it'll receive a notification and his _UserContactHistory list_ it'll update too.

- **DenyDebtRequest**

  Should deny a debt request from contact the requester it'll receive a notification.

- **NewPay**

  Should send a payment request of and debt of user (given his uuid from token) given a uuid, quantity to pay and optional message.

- **Payments**

  Should return a list of pending payments requests of user (given his uuid from token).

  In this list each item contains a payment debt request payload and each debt relationed.
