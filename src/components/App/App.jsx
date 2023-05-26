import { Component } from 'react';
import { nanoid } from 'nanoid';
import styles from './App.module.css';
import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contactList = JSON.parse(localStorage.getItem('contacts'));
    if (contactList) {
      this.setState({ contacts: contactList });
    }
  }

  componentDidUpdate(prevState) {
    const {contacts} = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  addContact = (contact) => {
    const { contacts } = this.state;
    const findContact = contacts.find(item => item.name === contact.name);

    if (findContact) {
      alert(`${contact.name} is alredy in contacts list`);
      return;
    }

    const newContact = {
      id: nanoid(),
      ...contact
    }

    this.setState(prevState => {
      return {
        contacts: [newContact, ...prevState.contacts],
      };
    })
  }

  deleteContact = (id) => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => id !== contact.id),
      }
    })
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  filterContact = (name) => {
    const { contacts } = this.state;
    const normalizedName = name.toLowerCase();

    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedName));
  }

  render() {
    const { filter } = this.state;
    const filterContacts = this.filterContact(filter);
    
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Phonebook</h1>
        <ContactForm onSubmit={this.addContact}/>

        <h2 className={styles.title}>Contacts</h2>
        <Filter filter={filter} onChange={this.handleChange}/>
        <ContactList contacts={filterContacts} onDeleteContact={this.deleteContact}/>
      </div>
    );
  }
}

export default App;
