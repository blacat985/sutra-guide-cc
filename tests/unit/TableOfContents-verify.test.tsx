import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TableOfContents from '../../src/components/sutra/TableOfContents';
// Mock hooks
vi.mock('../../src/hooks/useSutraData', () => ({
    useSutraData: () => ({
        sutra: {
            title: 'Samyukta Agama',
            chapters: 100,
            startChapter: 1,
        },
        loading: false,
    }),
}));

vi.mock('../../src/hooks/useChapterTitles', () => ({
    useChapterTitles: () => ({
        titles: new Map(),
        chapters: [
            { number: 599, title: 'Chapter 599', volume: 21, volumeTitle: 'Volume 21' },
            { number: 605, title: 'Chapter 605', volume: 24, volumeTitle: 'Volume 24' },
        ],
        loading: false,
    }),
}));



describe('TableOfContents Sidebar Expansion', () => {
    it('should expand the correct volume dynamically when currentChapter changes', () => {
        const { rerender } = render(
            <MemoryRouter>
                <TableOfContents sutraId="samyukta-agama" currentChapter="599" />
            </MemoryRouter>
        );

        // Initial state: Chapter 599 is in Volume 21
        const volume21Btn = screen.getByRole('button', { name: /Volume 21/i });
        expect(volume21Btn).toHaveAttribute('aria-expanded', 'true');

        // Volume 24 should be collapsed (or at least strictly check Volume 21 is expanded)
        const volume24Btn = screen.getByRole('button', { name: /Volume 24/i });
        expect(volume24Btn).toHaveAttribute('aria-expanded', 'false');

        // Update prop to Chapter 605 (Volume 24)
        rerender(
            <MemoryRouter>
                <TableOfContents sutraId="samyukta-agama" currentChapter="605" />
            </MemoryRouter>
        );

        // New state: Volume 24 should be expanded
        expect(volume24Btn).toHaveAttribute('aria-expanded', 'true');

        // Volume 21 should still be expanded? 
        // Our logic says: if (!expandedIndices.includes(newIndex)) setExpandedIndices([newIndex]);
        // Wait, setExpandedIndices([newIndex]) REPLACES the array.
        // So Volume 21 should collapse if we replace the array.
        // Let's verify this behavior. Ideally we want auto-collapse of previous?
        // The user request: "should collapse Volume 24, expand Volume 23" implies auto-collapse.
        // My implementation `setExpandedIndices([defaultVolumeIndex])` replaces the array, so it ensures single expansion focus (or at least adds the new one and removes others if I use replace).
        // Yes, `setExpandedIndices([defaultVolumeIndex])` resets it to just the new one.

        expect(volume21Btn).toHaveAttribute('aria-expanded', 'false');
    });
});
