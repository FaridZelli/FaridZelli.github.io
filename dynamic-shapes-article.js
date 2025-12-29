// ----------------------------------------
// https://github.com/FaridZelli
// ----------------------------------------

document.addEventListener("DOMContentLoaded", function() {

	// ------------------------------
	// Floating Shapes
	// ------------------------------

	const shapesContainer = document.querySelector(".svg-shapes");

	const shapes = [{
		name: "triangle",
		svg: `<path d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z"></path>`
	},
	{
		name: "square",
		svg: `<path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>`
	},
	{
		name: "diamond",
		svg: `<path d="M10.831 20.413l-5.375 -6.91c-.608 -.783 -.608 -2.223 0 -3l5.375 -6.911a1.457 1.457 0 0 1 2.338 0l5.375 6.91c.608 .783 .608 2.223 0 3l-5.375 6.911a1.457 1.457 0 0 1 -2.338 0z"></path>`
	},
	{
		name: "rectangle",
		svg: `<path d="M3 5m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>`
	},
	{
		name: "octagon",
		svg: `<path d="M12.802 2.165l5.575 2.389c.48 .206 .863 .589 1.07 1.07l2.388 5.574c.22 .512 .22 1.092 0 1.604l-2.389 5.575c-.206 .48 -.589 .863 -1.07 1.07l-5.574 2.388c-.512 .22 -1.092 .22 -1.604 0l-5.575 -2.389a2.036 2.036 0 0 1 -1.07 -1.07l-2.388 -5.574a2.036 2.036 0 0 1 0 -1.604l2.389 -5.575c.206 -.48 .589 -.863 1.07 -1.07l5.574 -2.388a2.036 2.036 0 0 1 1.604 0z"></path>`
	}
	];

	for (let i = 0; i < 25; i++) {
		const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
		const shapeElement = document.createElement("div");
		shapeElement.classList.add("shape", randomShape.name);
		shapeElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#7F4300" stroke="#FFA742" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">${randomShape.svg}</svg>`;
		const randomX = Math.random() * 100;
		const randomY = Math.random() * 100;
		shapeElement.style.left = `${randomX}%`;
		shapeElement.style.top = `${randomY}%`;
		const animations = ["moveDiagonal", "moveUpDown", "moveSideways"];
		shapeElement.style.animation = `${animations[Math.floor(Math.random() * animations.length)]} ${Math.random() * 15 + 3}s infinite alternate`;

		shapesContainer.appendChild(shapeElement);
	};
});

