const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(
  __dirname,
  "./db/contacts.json"
);

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);

  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = await contacts.find(
    ({ id }) => id === contactId
  );

  if (!contact)
    return `contact with id ${contactId} not found`;

  return contact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(
    ({ id }) => id === contactId
  );

  if (index === -1)
    return `contact with id ${contactId} not found`;

  const [removedContact] = contacts.splice(index, 1);
  await fs.writeFile(
    contactsPath,
    JSON.stringify(contacts, null, 2)
  );

  return removedContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);

  await fs.writeFile(
    contactsPath,
    JSON.stringify(contacts, null, 2)
  );

  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
