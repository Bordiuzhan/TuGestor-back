// const fs = require('fs/promises');
// const path = require('path');

// const contactsPath = path.join(__dirname, '/contacts.json');

// const genId = async () => {
//   try {
//     const contacts = await listContacts();
//     const contactsId = contacts.map((el) => parseInt(el.id));
//     const id = Math.max(...contactsId) + 1;
//     return id.toString();
//   } catch (error) {
//     console.log(error.message);
//   }
// };
// const rewriteContacts = async (data) => {
//   try {
//     const newContacts = JSON.stringify(data, null, '\t');
//     await fs.writeFile(contactsPath, newContacts);
//     return;
//   } catch (error) {
//     console.log(error.messsage);
//   }
// };

// const listContacts = async () => {
//   const data = await fs.readFile(contactsPath);
//   const contacts = JSON.parse(data);
//   return contacts;
// };

// const getContactById = async (contactId) => {
//   const contacts = await listContacts();
//   const foundedContact = contacts.find(
//     (el) => parseInt(el.id) === Number(contactId)
//   );
//   return foundedContact || null;
// };

// const updateById = async (id, data) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((el) => parseInt(el.id) === Number(id));
//   if (index === -1) {
//     return null;
//   }
//   contacts[index] = { ...contacts[index], ...data };
//   await rewriteContacts(contacts);
//   return contacts[index];
// };

// const removeContact = async (id) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((el) => parseInt(el.id) === Number(id));
//   if (index === -1) {
//     return null;
//   }
//   const [result] = contacts.splice(index, 1);
//   await rewriteContacts(contacts);
//   console.log(`The contact with ID: ${id} was removed! Contact list: `);
//   return result;
// };

// const addContact = async (name, email, phone) => {
//   const contacts = await listContacts();
//   const newContact = { id: await genId(), name, email, phone };
//   contacts.push(newContact);
//   await rewriteContacts(contacts);
//   return newContact;
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   updateById: updateById,
//   removeContact,
//   addContact,
// };
