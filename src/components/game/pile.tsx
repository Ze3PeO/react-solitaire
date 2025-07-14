import { useRef, useLayoutEffect, useState } from "react";

import Card from "./card";

export default function Pile() {
  const parentRef = useRef<HTMLDivElement>(null);

  // Card dimensions (from Card: w-16 = 4rem = 64px, aspect 5/7)
  const cardWidth = 64; // px
  const cardAspect = 5 / 7;
  const cardHeight = Math.round(cardWidth / cardAspect); // ≈ 90px
  const numCards = 10; // Update if dynamic

  const maxCardMarginTop = -90 * 0.66;

  const [cardMarginTop, setCardMarginTop] = useState(maxCardMarginTop);

  useLayoutEffect(() => {
    const updateCardMarginTop = () => {
      if (!parentRef.current) return;

      const parentHeight = parentRef.current.offsetHeight;
      const scaleFactor =
        (parentHeight - cardHeight) / (cardHeight * (numCards - 1));
      const margin = cardHeight - cardHeight * scaleFactor;

      setCardMarginTop(Math.min(maxCardMarginTop, -margin));
    };

    window.addEventListener("resize", updateCardMarginTop);

    updateCardMarginTop();

    return () => window.removeEventListener("resize", updateCardMarginTop);
  }, []);

  return (
    <div
      ref={parentRef}
      style={{
        "--card-margin-top": `${cardMarginTop}px`,
      }}
    >
      <Card text="Card 1">
        <Card text="Card 2">
          <Card text="Card 3">
            <Card text="Card 4">
              <Card text="Card 5">
                <Card text="Card 6">
                  <Card text="Card 7">
                    <Card text="Card 8">
                      <Card text="Card 9">
                        <Card text="Card 10"></Card>
                      </Card>
                    </Card>
                  </Card>
                </Card>
              </Card>
            </Card>
          </Card>
        </Card>
      </Card>
    </div>
  );
}
