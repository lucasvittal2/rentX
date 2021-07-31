import React from 'react';

import{
  Container
} from './styles';

interface Props {
    active?: boolean;
}

export function Bullet({
    active = true
}: Props){
 return ( 
    <Container active={active}/>
  );
}