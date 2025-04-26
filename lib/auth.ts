// This is a mock implementation. In a real application, this would be connected to your authentication system.
export function getUserRole(): string {
  // For demonstration purposes, we'll return a random role.
  // In a real application, this would check the authenticated user's role.
  const roles = ['user', 'organizer', 'coordinator', 'member'];
  return roles[Math.floor(Math.random() * roles.length)];
}

