type Point = { x: number; y: number };

// export const poissonDiskSampling = (
//   width: number,
//   height: number,
//   radius: number,
//   k = 30
// ): Point[] => {
//   const cellSize = radius / Math.sqrt(2);
//   const gridWidth = Math.ceil(width / cellSize);
//   const gridHeight = Math.ceil(height / cellSize);
//   const grid: (Point | null)[][] = Array.from({ length: gridWidth }, () =>
//     Array(gridHeight).fill(null)
//   );
//   const activeList: Point[] = [];
//   const points: Point[] = [];
//
//   const distance = (a: Point, b: Point) => Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
//
//   const randomPointAround = (point: Point) => {
//     const r1 = Math.random();
//     const r2 = Math.random();
//     const radius_ = radius * (r1 + 1);
//     const angle = 2 * Math.PI * r2;
//     return {
//       x: point.x + radius_ * Math.cos(angle),
//       y: point.y + radius_ * Math.sin(angle)
//     };
//   };
//
//   const inRectangle = (point: Point) =>
//     point.x >= 0 && point.x < width && point.y >= 0 && point.y < height;
//
//   const inNeighbourhood = (point: Point) => {
//     const gridX = Math.floor(point.x / cellSize);
//     const gridY = Math.floor(point.y / cellSize);
//     const startX = Math.max(gridX - 2, 0);
//     const endX = Math.min(gridX + 2, gridWidth - 1);
//     const startY = Math.max(gridY - 2, 0);
//     const endY = Math.min(gridY + 2, gridHeight - 1);
//
//     for (let x = startX; x <= endX; x++) {
//       for (let y = startY; y <= endY; y++) {
//         const neighbour = grid[x][y];
//         if (neighbour && distance(point, neighbour) < radius) {
//           return true;
//         }
//       }
//     }
//     return false;
//   };
//
//   const addPoint = (point: Point) => {
//     points.push(point);
//     activeList.push(point);
//     const gridX = Math.floor(point.x / cellSize);
//     const gridY = Math.floor(point.y / cellSize);
//     grid[gridX][gridY] = point;
//   };
//
//   // Initialize with a random point
//   addPoint({ x: Math.random() * width, y: Math.random() * height });
//
//   while (activeList.length) {
//     const index = Math.floor(Math.random() * activeList.length);
//     const point = activeList[index];
//     let found = false;
//
//     for (let i = 0; i < k; i++) {
//       const newPoint = randomPointAround(point);
//       if (inRectangle(newPoint) && !inNeighbourhood(newPoint)) {
//         addPoint(newPoint);
//         found = true;
//         break;
//       }
//     }
//
//     if (!found) {
//       activeList.splice(index, 1);
//     }
//   }
//
//   return points;
// };

export const poissonDiskSampling = (
  width: number,
  height: number,
  radius: number,
  random: number,
  k = 30
): Point[] => {
  const cellSize = radius / Math.sqrt(2);
  const gridWidth = Math.ceil(width / cellSize);
  const gridHeight = Math.ceil(height / cellSize);
  const grid: (Point | null)[][] = Array.from({ length: gridWidth }, () =>
    Array(gridHeight).fill(null)
  );
  const activeList: Point[] = [];
  const points: Point[] = [];

  const distance = (a: Point, b: Point) => Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);

  const randomPointAround = (point: Point) => {
    const r1 = Math.random();
    const r2 = Math.random();
    const radius_ = radius * (r1 + 1);
    const angle = 2 * Math.PI * r2;
    return {
      x: point.x + radius_ * Math.cos(angle),
      y: point.y + radius_ * Math.sin(angle)
    };
  };

  const randomPoint = (point: Point) => {
    const r1 = Math.random();
    const r2 = Math.random();
    return {
      x: point.x + (r1 - 0.5) * 2 * radius,
      y: point.y + (r2 - 0.5) * 2 * radius
    };
  };

  const inRectangle = (point: Point) =>
    point.x >= 0 && point.x < width && point.y >= 0 && point.y < height;

  const inNeighbourhood = (point: Point) => {
    const gridX = Math.floor(point.x / cellSize);
    const gridY = Math.floor(point.y / cellSize);
    const startX = Math.max(gridX - 2, 0);
    const endX = Math.min(gridX + 2, gridWidth - 1);
    const startY = Math.max(gridY - 2, 0);
    const endY = Math.min(gridY + 2, gridHeight - 1);

    for (let x = startX; x <= endX; x++) {
      for (let y = startY; y <= endY; y++) {
        const neighbour = grid[x][y];
        if (neighbour && distance(point, neighbour) < radius) {
          return true;
        }
      }
    }
    return false;
  };

  const addPoint = (point: Point) => {
    points.push(point);
    activeList.push(point);
    const gridX = Math.floor(point.x / cellSize);
    const gridY = Math.floor(point.y / cellSize);
    grid[gridX][gridY] = point;
  };

  // Initialize with a random point
  addPoint({ x: Math.random() * width, y: Math.random() * height });

  while (activeList.length) {
    const index = Math.floor(Math.random() * activeList.length);
    const point = activeList[index];
    let found = false;

    for (let i = 0; i < k; i++) {
      const newPoint = Math.random() < random ? randomPointAround(point) : randomPoint(point);
      if (inRectangle(newPoint) && !inNeighbourhood(newPoint)) {
        addPoint(newPoint);
        found = true;
        break;
      }
    }

    if (!found) {
      activeList.splice(index, 1);
    }
  }

  return points;
};
