import { renderHook, act } from '@testing-library/react-hooks';
import useForceUpdate from '../useForceUpdate';

describe('useForceUpdate hook', () => {
  it('works properly', () => {
    const { result, rerender } = renderHook(() => useForceUpdate());

    expect(result.current.isForceUpdated).toBe(false);

    act(() => {
      result.current.forceUpdate();
    });

    expect(result.current.isForceUpdated).toBe(true);

    rerender();

    expect(result.current.isForceUpdated).toBe(false);
  });
});
