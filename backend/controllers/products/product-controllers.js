const express = require('express')
const Product = require('../../models/product')

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (!products) {
            res.status(400).send({ message: "Products fetching failed", success: false });
            return;
        }

        res.status(200).send({ message: "Products fetched", products: products, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Some Error Occurred!", success: false });
    }
}

const addProduct = async (req, res) => {
    try {
        const { product } = req.body;
        const newProduct = new Product(product);
        await newProduct.save();
        res.status(200).send({ message: "Product Added", success: true })
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: "Inventory Updation Failed!", success: false });
    }
}

const getProductsFromId = async (req, res) => {
    const { id } = req.body;
    try {
        const product = await Product.find({ _id: id });
        if (!product) {
            res.status(400).send({ message: "Wrong Product Id", success: false });
            return;
        }
        res.status(200).send({ message: "Received a Product", products: product, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Some Error Occurred!", success: false });
    }
}
module.exports = { getProducts, addProduct, getProductsFromId };