const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");
const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({
  action,
  id,
  name,
  email,
  phone,
}) {
  switch (action) {
    case "list":
      try {
        const allContacts = await listContacts();
        console.table(allContacts);
      } catch (e) {
        console.log(e.message);
      }
      break;

    case "get":
      try {
        const contactId = await getContactById(id);
        console.table(contactId);
      } catch (e) {
        console.log(e.message);
      }
      break;

    case "add":
      try {
        const newContact = await addContact(
          name,
          email,
          phone
        );
        console.table(newContact);
      } catch (e) {
        console.log(e.message);
      }
      break;

    case "remove":
      try {
        const deleteContact = await removeContact(id);
        console.table(deleteContact);
      } catch (e) {
        console.log(e.message);
      }
      break;

    default:
      console.warn("Unknown action type!");
  }
}

invokeAction(argv);
