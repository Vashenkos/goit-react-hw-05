import { Field, Form, Formik } from "formik";
import toast from "react-hot-toast";


const SearchForm = ({ onSearch }) => {
  const initialValues = {
    query: "",
  };

  const handleSubmit = (values) => {
    if (values.query.trim() === "") {
      toast.error("Please enter a search term");
      return;
    }
    onSearch(values.query.trim());
  };

  return (
    <div >
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {() => (
          <Form >
            <Field
              
              name="query"
              type="text"
              placeholder="Search..."
            />
            <button type="submit">
              Search
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchForm;