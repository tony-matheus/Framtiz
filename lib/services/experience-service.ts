import camelcaseKeys from 'camelcase-keys';
import { Experience, ExperienceInput } from '../schemas/experience-schemas';
import { createServerSupabaseClient } from '../supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';

interface GetAllExperiencesOptions {
  page?: number;
  limit?: number;
}

const getAllExperiences = async (
  supabaseClient: SupabaseClient,
  { page = 1, limit = 10 }: GetAllExperiencesOptions
): Promise<{ experiences: Experience[]; totalPages: number }> => {
  let query = supabaseClient
    .from('experiences')
    .select('*', { count: 'exact' });

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  query = query
    .range(from, to)
    .order('start_date', { ascending: true })
    .order('end_date', { ascending: true, nullsFirst: false });

  const { data, count, error } = await query;

  if (error) {
    throw new Error(
      `Error fetching experiences: ${error.message || error.details}`
    );
  }

  const totalPages = Math.ceil((count || 1) / limit);

  const camelized = camelcaseKeys(data ?? [], { deep: true });

  return { experiences: camelized as Experience[], totalPages };
};

export const serverExperienceService = {
  async getAll(
    options: GetAllExperiencesOptions = {}
  ): Promise<{ experiences: Experience[]; totalPages: number }> {
    const supabase = await createServerSupabaseClient();
    return await getAllExperiences(supabase, options);
  },

  async getOne(id: number): Promise<Experience> {
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase
      .from('experiences')
      .select()
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(
        `Error fetching experience: ${error.message || error.details}`
      );
    }

    return data as Experience;
  },

  async create(experience: ExperienceInput): Promise<Experience> {
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase
      .from('experiences')
      .insert({
        company: experience.company,
        position: experience.position,
        location: experience.location,
        employment_type: experience.employmentType,
        start_date: experience.startDate,
        end_date: experience.endDate,
        is_current_position: experience.isCurrentPosition,
        description: experience.description,
        inserted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      throw new Error(`${error.message || error.details}`);
    }

    return data as Experience;
  },

  async update(
    id: number,
    experience: Partial<ExperienceInput>
  ): Promise<Experience> {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('experiences')
      .update({ ...experience, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(
        `Error updating experience with id ${id}: ${
          error.message || error.details
        }`
      );
    }

    return data as Experience;
  },

  async delete(id: number): Promise<boolean> {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.from('experiences').delete().eq('id', id);

    if (error) {
      throw new Error(
        `Error deleting experience with id ${id}: ${
          error.message || error.details
        }`
      );
    }

    return true;
  },
};

export const clientExperienceService = {
  async getAll(
    options: GetAllExperiencesOptions
  ): Promise<{ experiences: Experience[]; totalPages: number }> {
    const supabase = await createServerSupabaseClient();
    return getAllExperiences(supabase, options);
  },
};
