import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import {
  Container,
  ErrorContainer,
  Header,
  ListHeader,
  Card,
  InputSearchContainer,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/icons/sad.svg';

import Loader from '../../components/Loader';
import { Button } from '../../components/Button';
import ContactsService from '../../services/ContactsService';

export default function HomePage() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTherm, setSearchTherm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTherm.toLowerCase())
  )), [searchTherm, contacts]);

  async function loadContacts() {
    try {
      setIsLoading(true);
      const contactsList = await ContactsService.listContacts(orderBy);
      setHasError(false);
      setContacts(contactsList);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadContacts();
  }, [orderBy]);

  function handleToggleOrderBy() {
    setOrderBy(
      (prevState) => (prevState === 'asc' ? 'desc' : 'asc'),
    );
  }

  function handleChangeSetTherm(event) {
    const { value } = event.target;
    setSearchTherm(value);
  }

  function handleTryAgain() {
    loadContacts();
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />
      <InputSearchContainer>
        <input
          type="text"
          placeholder="Pesquisar contato..."
          value={searchTherm}
          onChange={handleChangeSetTherm}
        />
      </InputSearchContainer>

      <Header hasError={hasError}>
        {!hasError && (
          <strong>
            {filteredContacts.length}
            {' '}
            {filteredContacts.length === 1 ? 'contato' : 'contatos'}
          </strong>
        )}
        <Link to="/new">Novo contato</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="sad" />
          <div className="details">
            <strong>Ocorreu um erro ao obter os seus contatos!</strong>
            <Button type="button" onClick={handleTryAgain}>
              Tentar novamente
            </Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <>
          {filteredContacts.length > 0 && (
          <ListHeader orderBy={orderBy}>
            <button type="button" onClick={handleToggleOrderBy}>
              <span>Nome</span>
              <img src={arrow} alt="Arrow" />
            </button>
          </ListHeader>
          )}

          {filteredContacts.map((contact) => (
            <Card key={contact.id}>
              <div className="info">
                <div className="contact-name">
                  <strong>{contact.name}</strong>
                  {contact.category_name
                && <small>{contact.category_name}</small>}
                </div>
                <span>{contact.email}</span>
                <span>{contact.phone}</span>
              </div>
              <div className="actions">
                <Link to={`/edit/${contact.id}`}>
                  <img src={edit} alt="edit" />
                </Link>
                <button type="button">
                  <img src={trash} alt="Delete" />
                </button>
              </div>
            </Card>
          ))}
        </>
      )}
    </Container>
  );
}
