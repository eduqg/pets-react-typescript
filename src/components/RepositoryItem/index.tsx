import React from 'react';
import { Repository } from '../../store/ducks/repositories/types';

interface OwnProps {
  repository: Repository
}

// props: OwnProps = {repository}: OwnProps
export default function RepositoryItem({ repository }: OwnProps) {
  return <li>{repository.name}</li>;
}
