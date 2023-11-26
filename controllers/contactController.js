const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel.js");
//@description get all contacts
//@route Get /api/contacts
//@access private

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
});
//@description create a new contact
//@route Post /api/contacts
//@access private

const createContact = asyncHandler(async (req, res) => {
    // console.log(req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory.");
    }
    else {
        const contact = await Contact.create(
            { name, email, phone, user_id: req.user.id }
        );
        res.status(201).json(contact);
    }
});
//@description Get a new contact
//@route Get /api/contacts
//@access private

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
//@access private

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.send(403);
        throw new Error("User don't have permission to update other user contact");

    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id, req.body, { new: true });


    res.status(200).json(updatedContact);
});

//@description delete a new contact
//@route delete /api/contacts
//@access private

const deleteContact = asyncHandler(async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            res.status(404);
            throw new Error("Contact not found");
        }
        await Contact.findByIdAndDelete({ _id: req.params.id });
        if (contact.user_id.toString() !== req.user.id) {
            res.send(403);
            throw new Error("User don't have permission to update other user contact");

        }
        res.status(200).json(contact);
    }
    catch (err) {
        res.status(500).json({ message: "An error occurred while deleting the contact" });

    }


});




module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };