import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

async function deleteProject(id: number) {
  const { data } = await axios.delete(`/api/admin/projects/${id}`);

  return data;
}

export const useDeleteProject = () =>
  useMutation({
    mutationFn: deleteProject,
  });
