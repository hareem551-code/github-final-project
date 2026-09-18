const Product = require("../models/Product");

const getSaleStatus = (startDate, endDate) => {
  const now = new Date();
  if (now < new Date(startDate)) return "upcoming";
  if (now > new Date(endDate)) return "ended";
  return "active";
};

// deals array yahan rakh sakte hain (ya baad mein Deal model bana lein)
let deals = [ /* ... same deals data ... */ ];

exports.getAllDeals = async (req, res) => {
  // logic yahan
};

exports.createDeal = async (req, res) => {
  // logic yahan
};