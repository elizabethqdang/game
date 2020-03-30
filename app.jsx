import Game from './components/game';
import Menu from './components/menu';
import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', () => {

	const main = document.getElementById("main")
	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
	const input = document.getElementById('typing-form');
	const wordList = document.getElementById('word-list');
	const scoreInput = document.getElementById('high-score-form');
	const menuToggle = document.getElementById('menuIndicator');
	const superMario = document.getElementById('superMario');

	const game = new Game(main, ctx, canvas, wordList, input, scoreInput, menuToggle, superMario);

	menuToggle.addEventListener('click', game.menuClick); //

	const arcadeMode = document.getElementById('arcadeMode');
	arcadeMode.addEventListener('click', game.startGame);
	arcadeMode.addEventListener('keydown', game.startGame);

})
