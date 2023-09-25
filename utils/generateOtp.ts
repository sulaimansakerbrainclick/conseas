const generateOtp = () => {
  return Math.floor(Math.random() * 999999).toString();
};

export default generateOtp;
