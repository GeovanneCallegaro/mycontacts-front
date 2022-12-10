import PropTypes from 'prop-types';
import FormGroup from '../FormGroup';
import { Form, ButtonContainer } from './styles';
import { Input } from '../Input';
import { Select } from '../Select';
import { Button } from '../Button';

export default function ContactForm({ buttonLabel }) {
  return (
    <Form>
      <FormGroup>
        <Input placeholder="Nome" type="text" />
      </FormGroup>

      <FormGroup>
        <Input placeholder="E-mail" type="text" />
      </FormGroup>

      <FormGroup>
        <Input placeholder="Telefone" type="text" />
      </FormGroup>

      <FormGroup>
        <Select>
          <option value="instagram">Instagram</option>
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit">
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
