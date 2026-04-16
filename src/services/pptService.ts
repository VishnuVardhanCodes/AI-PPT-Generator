import pptxgen from 'pptxgenjs';
import { SlideContent } from './groqService';

export const generatePptFile = async (slides: (SlideContent & { imageUrl: string })[], topic: string) => {
  const pptx = new pptxgen();
  
  pptx.layout = 'LAYOUT_WIDE';
  pptx.defineLayout({ name: 'CUSTOM', width: 13.33, height: 7.5 });
  pptx.layout = 'CUSTOM';

  slides.forEach((slide, index) => {
    const pptSlide = pptx.addSlide();

    // 🔵 Top Header Bar
    pptSlide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: '100%',
      h: 1,
      fill: { color: '1E40AF' }
    });

    // Header Text (Uppercase, Bold)
    pptSlide.addText(slide.heading.toUpperCase(), {
      x: 0.5,
      y: 0.25,
      w: '90%',
      h: 0.5,
      fontSize: 28,
      bold: true,
      color: 'FFFFFF',
      fontFace: 'Poppins',
      align: 'left'
    });

    // Body Content
    if (index === 0) {
      // Title Slide Layout
      pptSlide.addText(topic, {
        x: 1,
        y: 2,
        w: '80%',
        h: 1.5,
        fontSize: 48,
        bold: true,
        color: '1E40AF',
        align: 'center',
        fontFace: 'Poppins'
      });
      pptSlide.addText('AI Generated Presentation', {
        x: 1,
        y: 3.5,
        w: '80%',
        h: 0.5,
        fontSize: 24,
        color: '6B7280',
        align: 'center',
        fontFace: 'Poppins'
      });
    } else if (index === slides.length - 1) {
      // Thank You Slide
      pptSlide.addText('THANK YOU', {
        x: 1,
        y: 3,
        w: '80%',
        h: 1,
        fontSize: 60,
        bold: true,
        color: '1E40AF',
        align: 'center',
        fontFace: 'Poppins'
      });
      pptSlide.addText('Thank you for your attention', {
        x: 1,
        y: 4.2,
        w: '80%',
        h: 0.5,
        fontSize: 24,
        color: '6B7280',
        align: 'center',
        fontFace: 'Poppins'
      });
    } else {
      // Content Slide Layout
      // Bullet Points on Left
      pptSlide.addText(slide.bulletPoints.map(p => `• ${p}`).join('\n\n'), {
        x: 0.5,
        y: 1.5,
        w: 6,
        h: 5,
        fontSize: 18,
        color: '374151',
        fontFace: 'Poppins',
        align: 'left',
        valign: 'top',
        lineSpacing: 30
      });

      // Image on Right
      pptSlide.addImage({
        path: slide.imageUrl,
        x: 7,
        y: 1.5,
        w: 5.8,
        h: 5,
        sizing: { type: 'cover', w: 5.8, h: 5 }
      });
    }
  });

  return pptx.writeFile({ fileName: `presentation-${topic.replace(/\s+/g, '-').toLowerCase()}.pptx` });
};
