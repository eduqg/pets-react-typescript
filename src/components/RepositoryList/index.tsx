import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';


import { Repository } from '../../store/ducks/repositories/types';
import { ApplicationState } from '../../store';

import * as RepositoryActions from '../../store/ducks/repositories/actions';

import RepositoryItem from '../RepositoryItem';

// Mapeia informações que vem do mapStateToProps
interface StateProps {
  repositories: Repository[]
}

// Mapeio funcoes que vem do map dispatch to props do redux
interface DispatchProps {
  loadRequest(): void
}

// Mapeia qualquer outra propriedade que vem do componente pai
interface OwnProps {

}

type Props = StateProps & DispatchProps & OwnProps;

function RepositoryList({ repositories, loadRequest }: Props) {
  useEffect(() => {
    loadRequest();
  }, [loadRequest]);

  return (
    <ul>
      {repositories.map((repository) => (
        <RepositoryItem key={repository.id} repository={repository} />
      ))}

    </ul>
  );
}

const mapStateToProps = (state: ApplicationState) => ({
  repositories: state.repositories.data,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(RepositoryActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RepositoryList);
