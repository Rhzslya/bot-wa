export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Selamat pagi";
  if (hour < 18) return "Selamat siang";
  return "Selamat malam";
};

export const greets = [
  "halo",
  "hi",
  "hai",
  "hey",
  "selamat pagi",
  "selamat siang",
  "selamat sore",
  "selamat malam",
];
