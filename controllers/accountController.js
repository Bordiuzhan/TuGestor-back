const { ctrlWrapper } = require('../helpers/index');
const fs=require("fs")
const path = require('path');
// const { HttpError } = require('../helpers');
const { Account } = require('../models/Account');
const { User } = require('../models/user');
const { default: puppeteer } = require('puppeteer');
const { compile } = require('../helpers/createPDF');

const create = async (req, res) => {
  const data = {
    ...req.body,
    tableData: req.body.tableData.map((item) =>
      item.price && item.total
        ? item
        : item.total && !item.price
        ? { ...item, price: '1' }
        : !item.total && item.price
        ? { ...item, total: '0' }
        : { ...item, total: '0', price: '1' }
    ),
    number: req.accountNum,
  };
  // const saveDoc = async () => {
  //   const doc = new Account({
  //     ...data,
  //     user: req.userId,
  //   });
  //   const account = await doc.save();
  //   res.json(account);
  //   return doc;
  // };
   // await saveDoc();
    const result  =await Account.create({...data,user:req.userId,});
    res.status(201).json(result);
};

const getAccounts =async(req,res)=>{
  const adminId = (await User.findOne({ login: 'admin' }, { _id: 1 }))?._id?.toString();
  const findParams = adminId === req.userId ? {} : { user: req.userId };
  const accounts = await Account.find(findParams, { name: 1, date: 1, number: 1, total: 1, factura: 1, year: 1 })
    .sort({ createdAt: -1 })
    .skip(req.query.offset || 0)
    .limit(req.query.limit || 10);
  const count = await Account.find(findParams).count();
  res.json({ accounts: accounts, count });
};

const getNumber=async(req,res)=>{
  const tempDir = path.join(__dirname,"");
  console.log(tempDir);
  const year = new Date().getFullYear().toString();
    const numArr =
      (await Account.find({ year: year }).count()) > 0
        ? await Account.find({ year: year }).sort({ number: -1 }).limit(1)
        : 0;
    res.json(numArr === 0 ? 1 : numArr[0].number + 1);
};

const getAccount=async(req,res)=>{
  await Account.findOneAndUpdate({ _id: req.params.id }, req.body);
  const date = req.body.date;
  const data = req.body;
  const dir = process.env.STORE_FILES_PATH + '/' + 'albaran' + '/' + date.replace(/-/g, '/');
  // if (!fs.existsSync(dir)) {
  //   fs.mkdirSync(dir, { recursive: true });
  // }
  const filename = dir + '/' + req.params.id + '.pdf';
  if (fs.existsSync(filename)) {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    const content = await compile('index', {
      ...data,
      number: `000${data.number}`.slice(-4),
      type: 'Albarán',
    });
    await page.setContent(content);
    const pdf = await page.pdf({
      format: 'A4',
      parintBackground: true,
      displayHeaderFooter: false,
      margin: {
        top: '10px',
        right: '10px',
        bottom: '10px',
        left: '10px',
      },
    });
    await browser.close();
    fs.appendFileSync(filename, pdf);
  }
  res.status(200).json();
}

// const getAll = async (req, res) => {
//   const { _id: owner } = req.user;
//   const { page = 1, limit = 2, favorite, name, email } = req.query;
//   const searchParams = { owner };
//   const skip = (page - 1) * limit;

//   if (favorite === 'true' || favorite === 'false') {
//     searchParams.favorite = favorite;
//     searchParams.name = name;
//   }
//   if (name) {
//     searchParams.name = name;
//   }
//   if (email) {
//     searchParams.email = email;
//   }

//   const result = await Contact.find(
//     searchParams,
//     '-createdAt',
//     {
//       skip,
//       limit,
//     }
//     // eslint-disable-next-line spaced-comment
//   ); //.populate("owner","name email") -  повертає зв'язаний об'єкт, певні поля;
//   res.json(result);
// };
// const getById = async (req, res) => {
//   const { contactId } = req.params;
//   const { _id: owner } = req.user;
//   const result = await Contact.findOne({ contactId, owner });
//   // const result = await Contact.findById(contactId);
//   if (!result) {
//     throw HttpError(404, 'Server not found');
//   }
//   res.json(result);
// };
// const add = async (req, res) => {
//   const { _id: owner } = req.user;
//   const result = await Contact.create({ ...req.body, owner });
//   res.status(201).json(result);
// };
// const updateById = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await Contact.findByIdAndUpdate(contactId, req.body, {
//     new: true,
//   });
//   if (!result) {
//     throw HttpError(404, 'Server not found');
//   }
//   res.json(result);
// };
// const updateStatusContact = async (req, res) => {
//   const { contactId } = req.params;
//   const { body } = req.body;
//   if (!body) {
//     throw HttpError(400, 'missing field favorite');
//   }
//   const result = await Contact.findByIdAndUpdate(contactId, body, {
//     new: true,
//   });
//   if (!result) {
//     throw HttpError(404, 'Server not found');
//   }
//   res.json(result);
// };
// const deleteById = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await Contact.findByIdAndRemove(contactId);
//   if (!result) {
//     throw HttpError(404, 'Server not found');
//   }
//   res.json({
//     message: 'Delete success',
//   });
//   // res.status(204).send() // 204 Не передає меседж
// };

module.exports = {
  create: ctrlWrapper(create),
  getAccounts: ctrlWrapper(getAccounts),
  getNumber: ctrlWrapper(getNumber),
  getAccount: ctrlWrapper(getAccount),
  // getAll: ctrlWrapper(getAll),
  // getById: ctrlWrapper(getById),
  // add: ctrlWrapper(add),
  // updateById: ctrlWrapper(updateById),
  // updateStatusContact: ctrlWrapper(updateStatusContact),
  // deleteById: ctrlWrapper(deleteById),
};
