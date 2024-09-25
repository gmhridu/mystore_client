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

export const categoryOptionsMap = {
  "men": "Men",
  "women": "Women",
  "kids": "Kids",
  "accessories": "Accessories",
  "footwear": "Footwear",
};

export const brandOptionsMap = {
  "nike": "Nike",
  "adidas": "Adidas",
  "puma": "Puma",
  "levi": "Levi's",
  "zara": "Zara",
  "h&m": "H&M",
}

export const filterOptions = {
  Category: [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "kids", label: "Kids" },
    { id: "accessories", label: "Accessories" },
    { id: "footwear", label: "Footwear" },
  ],
  Brand: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "levi", label: "Levi's" },
    { id: "zara", label: "Zara" },
    { id: "h&m", label: "H&M" },
  ],
};
export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = (control, defaultValues = {}) => [
  {
    name: "address",
    label: "Address",
    placeholder: "Enter your address",
    defaultValue: defaultValues.address || "",
    control: control,
    rules: { required: "Address is required" },
  },
  {
    name: "city",
    label: "City",
    placeholder: "Enter your city",
    defaultValue: defaultValues.city || "",
    control: control,
    rules: { required: "City is required" },
  },
  {
    name: "state",
    label: "State",
    placeholder: "Enter your state",
    defaultValue: defaultValues.state || "",
    control: control,
    rules: { required: "State is required" },
  },
  {
    name: "zip",
    label: "Zip Code",
    placeholder: "Enter your zip code",
    defaultValue: defaultValues.zip || "",
    control: control,
    type: "text",
    rules: { required: "Zip code is required" },
  },
  {
    name: "phone",
    label: "Phone",
    placeholder: "Enter your phone number",
    defaultValue: defaultValues.phone || "",
    control: control,
    type: "text",
    rules: {
      required: "Phone number is required",
    },
  },
  {
    name: "notes",
    label: "Notes",
    placeholder: "Additional notes (optional)",
    defaultValue: defaultValues.notes || "",
    control: control,
    type: "textarea",
    rules: {},
  },
];

export const adminOrderDetailsSelect = [
  { label: "Pending", value: "pending" },
  { label: "Processing", value: "processing" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];






