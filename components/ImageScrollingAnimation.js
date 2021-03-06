import React, { useEffect, useState, useRef } from 'react';
import styles from '../styles/ImageScrollingAnimation.module.css';
import $ from 'jquery';

function ImageScrollingAnimation() {
	let bigImages = [
		'url(images/slider/AllianzXuanLanFull.jpeg)',
		'url(images/slider/MadridEscenaFull.jpeg)',
		'url(images/slider/RevolutionOnIceFull.jpeg)'
	];
	let smallImages = [
		'url(images/slider/AllianzXuanLanSmall.jpeg)',
		'url(images/slider/MadridEscenaSmall.jpeg)',
		'url(images/slider/RevolutionOnIceSmall.jpeg)'
	];
	const [ offset, setOffset ] = useState(0);
	const [ textIndex, setTextIndex ] = useState(1);
	const containerRef = useRef(0);
	let [ topOffset, setTopOffset ] = useState(0);
	const [ images, setImages ] = useState([]);

	useEffect(() => {
		const onScroll = () => setOffset(window.pageYOffset);
		window.onload = () => {
			if (window.innerWidth <= 600) {
				setImages(smallImages);
			} else {
				setImages(bigImages);
			}
		};
		// clean up code
		const { offsetTop } = containerRef.current;
		setTopOffset(offsetTop - 130);
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, []);

	// console.log(`OffsetTop: ${topOffset}`);
	useEffect(
		() => {
			const { offsetTop } = containerRef.current;
			setTopOffset(offsetTop - 130);
			const container = document.getElementById('scrolling-image-animation-section');

			// if (offset > topOffset - 300) {
			//   container.style.opacity = '1';
			// } else {
			//   container.style.opacity = '0';
			// }

			if (offset > topOffset + 800) {
				setTextIndex(5);
			} else if (offset > topOffset + 600) {
				setTextIndex(4);
			} else if (offset > topOffset + 400) {
				setTextIndex(3);
			} else if (offset > topOffset + 200) {
				setTextIndex(2);
			} else if (offset > topOffset) {
				setTextIndex(1);
			}
		},
		[ offset ]
	);

	useEffect(
		() => {
			const container = document.getElementById('scrolling-image-animation-section');
			const text1 = document.getElementById('text1');
			const text2 = document.getElementById('text2');
			const text3 = document.getElementById('text3');
			// console.log('Text View Change');
			// console.log(textIndex);
			const colorWhite = '#fff';
			const colorFade = '#ffffff99';
			const colorFader = '#ffffff33';
			if (textIndex == 1) {
				text1.style.transform = 'scale(1.5)';
				text1.style.color = colorWhite;
				text2.style.transform = 'scale(1)';
				text2.style.color = colorFade;
				text3.style.transform = 'scale(1)';
				text3.style.color = colorFade;

				container.style.backgroundImage = images[0];
			} else if (textIndex == 2) {
				text1.style.transform = 'scale(1)';
				text1.style.color = colorFader;
				text2.style.transform = 'scale(1.5)';
				text2.style.color = colorWhite;
				text3.style.transform = 'scale(1)';
				text3.style.color = colorFade;

				container.style.backgroundImage = images[1];
			} else if (textIndex == 3) {
				text1.style.transform = 'scale(1)';
				text1.style.color = colorFader;
				text2.style.transform = 'scale(1)';
				text2.style.color = colorFader;
				text3.style.transform = 'scale(1.5)';
				text3.style.color = colorWhite;

				container.style.backgroundImage = images[2];
			}
		},
		[ textIndex ]
	);

	// console.log(offset);
	return (
		<div
			ref={containerRef}
			id="scrolling-image-animation-section"
			onScroll={() => {
				// console.log('Scrolling div');
			}}
			className={styles.container}
			style={{ backgroundImage: images[0] }}
		>
			<div
				id="textContainer"
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column'
				}}
			>
				<div id="text1" className={`${styles.text} ${styles.zoom}`}>
					Allianz Xuan Lan
				</div>
				<div id="text2" className={`${styles.text} `}>
					Madrid Escena
				</div>
				<div id="text3" className={`${styles.text} `}>
					Revolution On Ice
				</div>
			</div>
		</div>
	);
}

export default ImageScrollingAnimation;
