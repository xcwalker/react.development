import { type ItemType } from "@/types";
import styles from "@/styles/routes/projects/images.module.css";
import { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Download, Zoom } from "yet-another-react-lightbox/plugins";
import { MasonryPhotoAlbum, type Photo } from "react-photo-album";
import GFIcon from "../../components/GFIcon";
import Button from "@/components/button";
import "react-photo-album/masonry.css";
import Section from "@/components/section";

export default function Project_images(props: {
  item: ItemType;
  slug: string;
}) {
  const item = props.item;
  const [open, setOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [images, setImages] = useState<Photo[]>([]);

  useEffect(() => {
    if (item.metaData.images === undefined || item.metaData.images.length === 0)
      return;

    item.metaData.images.map((url, index) => {
      const string = url;

      const getMeta = (
        url: string,
        cb: (err: string | Event | null, img?: HTMLImageElement) => void,
      ) => {
        const img = new Image();
        img.onload = () => cb(null, img);
        img.onerror = (err) => cb(err);
        img.src = url;
      };

      // Use like:
      getMeta(string, (_err, img) => {
        setImages((prev) => {
          if (prev.some((v) => v.key === index.toString())) return [...prev];
          return [
            ...prev,
            {
              key: index.toString(),
              src: string,
              height: img ? img.naturalHeight : 0,
              width: img ? img.naturalWidth : 0,
            },
          ];
        });
      });
    });

    return () => {
      setImages([]);
    };
  }, [item.metaData.images, props.slug]);

  return (
    <Section id="project-images" className={styles.section}>
      <Button
        onClick={() => setOpen(true)}
        title="Show Lightbox"
        hidden
        // className={css.tabButton}
        text="Show Lightbox"
      />
      <MasonryPhotoAlbum
        photos={images}
        sizes={{
          size: "1200px",
          sizes: [
            {
              size: "calc(100vw - 2rem)",
              viewport: "(max-width: 1200px)",
            }
          ]
        }}
        columns={(width) => {
          if (width >= 1200) return 4;
          else if (width >= 900) return 3;
          else if (width >= 600) return 2;
          return 1;
        }}
        breakpoints={[300, 600, 900, 1200, 1500, 1800, 2100]}
        onClick={({ index: current }) => {
          setSlideIndex(current);
          setOpen(true);
        }}
        render={{
          button: (props) => <button {...props} tabIndex={-1} />,
          extras: () => <GFIcon className={styles.full} icon="fullscreen" />,
        }}
      />
      <Lightbox
        open={open}
        index={slideIndex}
        close={() => setOpen(false)}
        slides={images}
        plugins={[Download, Zoom]}
      />
    </Section>
  );
}
