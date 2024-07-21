import Counter from "../models/counterModel"; // Import model counter

export const getNextSequenceValue = async (sequenceName: any) => {
  const sequenceDocument = await Counter.findByIdAndUpdate(
    sequenceName,
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  return sequenceDocument.sequence_value;
};
