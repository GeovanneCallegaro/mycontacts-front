import PropTypes from 'prop-types';
import { useState } from 'react';

import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';
import useErrors from '../../hooks/useErrors';

import { Form, ButtonContainer } from './styles';

import FormGroup from '../FormGroup';
import { Input } from '../Input';
import { Select } from '../Select';
import { Button } from '../Button';

export default function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const {
    setError,
    removeError,
    getErrorMessageByFieldName,
    errors,
  } = useErrors();

  const isFormValid = (name && errors.length === 0);

  function handleNameChange(event) {
    const { value } = event.target;
    setName(value);

    if (!value) {
      setError({ field: 'name', message: 'O nome é obrigatório.' });
    } else {
      removeError({ fieldName: 'name' });
    }
  }

  function handleEmailChange(event) {
    const { value } = event.target;
    setEmail(value);

    if (value && !isEmailValid(value)) {
      setError({ field: 'email', message: 'Email inválido.' });
    } else {
      removeError({ fieldName: 'email' });
    }
  }

  function handlePhoneChange(event) {
    const { value } = event.target;
    setPhone(formatPhone(value));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log({
      name, email, phone: phone.replace(/\D/g, ''), category,
    });
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          error={getErrorMessageByFieldName('name')}
          placeholder="Nome *"
          type="text"
          value={name}
          onChange={handleNameChange}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          error={getErrorMessageByFieldName('email')}
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder="Telefone"
          type="text"
          value={phone}
          onChange={handlePhoneChange}
          maxLength="15"
        />
      </FormGroup>

      <FormGroup>
        <Select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="">Categoria</option>
          <option value="instagram">Instagram</option>
          <option value="discord">Discord</option>
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid}>
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
