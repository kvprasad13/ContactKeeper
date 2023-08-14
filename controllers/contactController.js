const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel.js");
//@description get all contacts
//@route Get /api/contacts
//@access public

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});
//@description create a new contact
//@route Post /api/contacts
//@access public

const createContact = asyncHandler(async (req, res) => {
    // console.log(req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory.");
    }
    else {
        const contact = await Contact.create(
            { name, email, phone }
        );
        res.status(201).json(contact);
    }
});
//@description Get a new contact
//@route Get /api/contacts
//@access public

const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

//@description update a new contact
//@route Post /api/contacts
//@access public

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id, req.body, { new: true });


    res.status(200).json(updatedContact);
});

//@description delete a new contact
//@route delete /api/contacts
//@access public

const deleteContact = asyncHandler(async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            res.status(404);
            throw new Error("Contact not found");
        }
        res.status(200).json(contact);
    }
    catch (err) {
        res.status(500).json({ message: "An error occurred while deleting the contact" });

    }


});




module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };