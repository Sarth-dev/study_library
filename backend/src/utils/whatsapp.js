exports.getWhatsAppLink = (phone, message) => {
  // ensure no spaces or + in phone
  const cleanPhone = phone.replace(/\D/g, "");
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/91${cleanPhone}?text=${encodedMessage}`;
};
