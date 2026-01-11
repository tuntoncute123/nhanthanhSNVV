import React, { forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import './photo-book.css';

const Page = forwardRef((props, ref) => {
    return (
        <div className={`book-page ${props.number % 2 === 0 ? 'even' : 'odd'}`} ref={ref}>
            <div className="page-content">
                {props.children}
                <span className="page-number">{props.number}</span>
            </div>
        </div>
    );
});

const Cover = forwardRef((props, ref) => {
    return (
        <div className="book-page book-cover" ref={ref} data-density="hard">
            <div className="cover-content">
                <h1 className="cover-title">{props.title}</h1>
                <p className="cover-subtitle">{props.subtitle}</p>
            </div>
        </div>
    );
});

const PhotoBook = ({ images }) => {
    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 600);

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 600);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="book-container">
            <HTMLFlipBook
                width={isMobile ? 320 : 400}
                height={isMobile ? 480 : 550}
                size="stretch"
                minWidth={300}
                maxWidth={600}
                minHeight={400}
                maxHeight={800}
                maxShadowOpacity={0.5}
                showCover={true}
                mobileScrollSupport={true}
                usePortrait={isMobile}
                className="flip-book"
            >
                <Cover title="Happy Birthday" subtitle="Nhan Thanh's Memories" />

                {images.map((img, index) => (
                    <Page number={index + 1} key={index}>
                        <div className="page-image-container">
                            <img src={img} alt={`Memory ${index + 1}`} className="page-image" loading="lazy" />
                        </div>
                        <p className="page-footer">Sweet Memory {index + 1}</p>
                    </Page>
                ))}

                <Cover title="The End" subtitle="With Lots of Love ❤️" />
            </HTMLFlipBook>
        </div>
    );
};

export default PhotoBook;
