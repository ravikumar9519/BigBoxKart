import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

export const getProductById = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample Brand",
    category: "sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "sample Description",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    (product.name = name),
      (product.price = price),
      (product.description = description),
      (product.image = image),
      (product.brand = brand),
      (product.category = category),
      (product.countInStock = countInStock);

    const updatedProduct = await product.save();
    res.status(204).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: " Item Sucessfully deleted" });
  } else {
    res.status(404);
    throw new Error(" Resource not found");
  }
});

export const createProductReview = asyncHandler(async (req, res) => {
  console.log("I WAS HERE");
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.review.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment: comment,
      user: req.user._id,
    };
    product.review.push(review);
    product.numReviews = product.review.length;
    product.rating =
      product.review.reduce((acc, r) => acc + r.rating, 0) /
      product.review.length;

    await product.save();
    res.status(201).json({ message: "Review Added" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

export const searchProduct = asyncHandler(async (req, res) => {
  const { keyword } = req.params;
  const products = await Product.find({
    $or: [
      {
        name: { $regex: keyword, $options: "i" },
      },
      {
        description: { $regex: keyword, $options: "i" },
      },
      {
        category: { $regex: keyword, $options: "i" },
      },
      {
        brand: { $regex: keyword, $options: "i" },
      },
    ],
  });
  console.log(products);
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export const getBooks = asyncHandler(async (req, res) => {
  const products = await Product.find({ category: "Book" });
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});
export const getElectronics = asyncHandler(async (req, res) => {
  const products = await Product.find({ category: "Electronics" });
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

export const getFoods = asyncHandler(async (req, res) => {
  const products = await Product.find({ category: "Food" });
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});
