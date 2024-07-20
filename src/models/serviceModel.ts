import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  serviceType: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  serviceId: {
    type: Number,
    required: true,
  },
});

const Service =
  mongoose.models.service || mongoose.model("service", serviceSchema);

export default Service;
