#!/usr/bin/env tsx

import { createServerSupabaseClient } from '../lib/supabase/server';

async function setupAnalyticsDatabase() {
  console.log('🔧 Setting up analytics database schema...');

  try {
    const supabase = await createServerSupabaseClient();

    // Add metadata JSONB column if it doesn't exist
    console.log('📝 Adding metadata JSONB column...');
    const { error: metadataError } = await supabase.rpc('exec_sql', {
      sql: "ALTER TABLE analytics ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'",
    });

    if (metadataError) {
      console.warn('⚠️  Metadata column setup warning:', metadataError.message);
    } else {
      console.log('✅ Metadata column setup completed');
    }

    // Create indexes for optimal query performance
    console.log('📊 Creating database indexes...');

    const indexes = [
      'CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics(created_at)',
      'CREATE INDEX IF NOT EXISTS idx_analytics_page ON analytics(page)',
      'CREATE INDEX IF NOT EXISTS idx_analytics_country ON analytics(country)',
      'CREATE INDEX IF NOT EXISTS idx_analytics_device ON analytics(device)',
      'CREATE INDEX IF NOT EXISTS idx_analytics_page_created_at ON analytics(page, created_at)',
    ];

    for (const indexSql of indexes) {
      const { error } = await supabase.rpc('exec_sql', { sql: indexSql });
      if (error) {
        console.warn('⚠️  Index creation warning:', error.message);
      }
    }

    console.log('✅ Database indexes setup completed');

    // Verify the table structure
    console.log('🔍 Verifying table structure...');
    const { data: columns, error: verifyError } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type, is_nullable, column_default')
      .eq('table_name', 'analytics')
      .order('ordinal_position');

    if (verifyError) {
      console.warn('⚠️  Table verification warning:', verifyError.message);
    } else {
      console.log('📋 Analytics table structure:');
      columns?.forEach((column) => {
        console.log(
          `  - ${column.column_name}: ${column.data_type} (nullable: ${column.is_nullable})`
        );
      });
    }

    console.log('🎉 Analytics database setup completed successfully!');
  } catch (error) {
    console.error('❌ Error setting up analytics database:', error);
    process.exit(1);
  }
}

// Run the setup if this script is executed directly
if (require.main === module) {
  setupAnalyticsDatabase();
}

export { setupAnalyticsDatabase };
