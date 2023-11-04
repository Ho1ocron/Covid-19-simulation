N = int(input())
T = int(input())
distances = []
for _ in range(N-1):
    distances.append(int(input()))
    
total_distance = sum(distances)
if T >= total_distance:
    left_buoy = 1
    right_buoy = N
else:
    current_distance = 0
    right_buoy = 0
    for i in range(N-1):
        current_distance += distances[i]
        if current_distance > T:
            right_buoy = i+1
            break
    left_buoy = right_buoy
    while left_buoy > 1 and T >= (total_distance - current_distance + distances[left_buoy-2]):
        T -= (total_distance - current_distance + distances[left_buoy-2])
        left_buoy -= 1

print(left_buoy, right_buoy)