import ContactForm from 'components/contactForm/ContactForm';
import ContactList from 'components/contactList/ContactList';
import { HandleChangeFilterField } from 'components/filterField/FilterField';
import { handleSubmit } from 'components/Contacts/AddContacts';
import { selectFilter } from '../redux/auth/selectors';
import Filter from 'components/filter/Filter';
import { UserMenu } from 'components/UserMenu/UserMenu';

const Contacts = () => {
  return (
    <div>
      <h1>PhoneBook</h1>
      <ContactForm handleSubmit={handleSubmit}></ContactForm>

      <h2>Contacts</h2>
      <Filter
        filter={selectFilter}
        handleChangeFilterField={HandleChangeFilterField}
      ></Filter>

      <ContactList></ContactList>

      <UserMenu />
    </div>
  );
};

export default Contacts;
