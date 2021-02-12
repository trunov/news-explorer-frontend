import React from 'react';
import "./SavedNewsHeader.css";

function SavedNewsHeader() {
  return (
    <section className='savedNews-header'>
      <p className='savedNews-header__heading'>Сохранённые статьи</p>
      <h2 className='savedNews-header__info'>Кирилл, у вас 5 сохранённых статей</h2>
      <p className='savedNews-header__tags'>
        По ключевым словам: <span className='savedNews-header__tag'>Природа</span>,{' '}
        <span className='savedNews-header__tag'>Тайга</span> и{' '}
        <span className='savedNews-header__tag'>2-м другим</span>
      </p>
    </section>
  );
}

export default SavedNewsHeader;
