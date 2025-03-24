function CarouselItem(props: {
  imageUrl: string;
  title: string;
  description: string;
}) {
  const { imageUrl, title, description } = props;

  return (
    <div
      className="carousel-item"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.4)), url(${imageUrl})`,
      }}
    >
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export default CarouselItem;
