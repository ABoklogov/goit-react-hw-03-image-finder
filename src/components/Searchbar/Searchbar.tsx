import { Component } from 'react';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';
import SearchForm from './SearchForm';

interface Props {
  onSubmit: (imageName: string) => void;
};

interface State {
  imageName: string;
};

class Searchbar extends Component<Props, State> {
  state = {
    imageName: '',
  };

  handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ imageName: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { imageName } = this.state;
    const { onSubmit } = this.props;

    if (imageName.trim() === '') {
      toast.error('Please enter the name of the picture');
      return;
    }

    onSubmit(imageName);
    this.setState({ imageName: '' });
  };

  render() {
    const { imageName } = this.state;

    return (
      <header className={s.Searchbar}>
        <SearchForm
          onSubmit={this.handleSubmit}
          value={imageName}
          onChange={this.handleNameChange}
        />
      </header>
    );
  }
}

export default Searchbar;
