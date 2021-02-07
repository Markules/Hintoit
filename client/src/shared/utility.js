import Microlink from "@microlink/react";

export const updateObject = (oldObject, updateProperties) => {
  return {
    ...oldObject,
    ...updateProperties,
  };
};

export const checkValidity = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }
  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  if(rules.isUrl) {
    const pattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g;
    // const regex = new RegExp(pattern);
    isValid = pattern.test(value) && isValid
  }

  return isValid;
};

export const linkValidator = (url) => {
  const expression =
    "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?";

  const regex = new RegExp(expression);

  if (url.match(regex)) {
    return true;
  } else {
    return false;
  }
};

export const previewLink = (item) => {
  // check if gift link is valid
  console.log('preview', item)
  if (linkValidator(item.url) === false) {
    return null;
  } else {
    return (
     
        <Microlink
          size="large"
          style={{position: 'relative', top: '5%' , height: '75%', margin: '0', border: 'none', zIndex: '0'}}
          url={item.url}
          setData={(data) => ({
            ...data,
            description: null,
          })}
        />
    );
  }
};
