export const registerFormControls = (control) => [
  {
    name: "username",
    label: "Username",
    placeholder: "Enter your username",
    control: control,
    rules: { required: true },
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    control: control,
    rules: { required: true },
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    control: control,
    rules: { required: true },
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Confirm your password",
    control: control,
    rules: { required: true },
  },
];

export const loginFormControls = (control) => [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    control: control,
    rules: { required: true },
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    control: control,
    rules: { required: true },
  },
];

export const addProductFormElements = (control, defaultValues = {}) => [
  {
    name: "title",
    label: "Title",
    placeholder: "Enter product title",
    control: control,
    rules: { required: true },
    defaultValue: defaultValues.title || "",
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Enter product description",
    control: control,
    type: "textarea",
    rules: { required: true },
    defaultValue: defaultValues.description || "",
  },
  {
    name: "category",
    label: "Category",
    placeholder: "Select a category",
    control: control,
    type: "select",
    options: [
      { value: "men", label: "Men" },
      { value: "women", label: "Women" },
      { value: "kids", label: "Kids" },
      { value: "accessories", label: "Accessories" },
      { value: "footwear", label: "Footwear" },
    ],
    rules: { required: true },
    defaultValue: defaultValues.category || "",
  },
  {
    name: "brand",
    label: "Brand",
    placeholder: "Select a brand",
    control: control,
    type: "select",
    options: [
      { value: "nike", label: "Nike" },
      { value: "adidas", label: "Adidas" },
      { value: "puma", label: "Puma" },
      { value: "levi", label: "Levi's" },
      { value: "zara", label: "Zara" },
      { value: "h&m", label: "H&M" },
    ],
    rules: { required: true },
    defaultValue: defaultValues.brand || "",
  },
  {
    name: "price",
    label: "Price",
    placeholder: "Enter product price",
    control: control,
    type: "number",
    rules: { required: true },
    defaultValue: defaultValues.price || "",
  },
  {
    name: "salePrice",
    label: "Sale Price",
    placeholder: "Enter sale price (optional)",
    control: control,
    type: "number",
    rules: {},
    defaultValue: defaultValues.salePrice || "",
  },
  {
    name: "totalStock",
    label: "Total Stock",
    placeholder: "Enter total stock",
    control: control,
    type: "number",
    rules: { required: true },
    defaultValue: defaultValues.totalStock || "",
  },
];



