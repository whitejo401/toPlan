-- Seed data for toplan family schedule management app
-- This file contains sample data for all existing tables
-- Based on actual database schema from migrations

-- Disable foreign key checks temporarily for seeding
SET session_replication_role = replica;

-- Sample user ID (this would come from auth.users table)
-- In a real application, this would be an actual user ID from Supabase auth
-- For demo purposes, we'll use this UUID for the main family account
-- Main User: 0b663673-00f6-48c8-8731-36e4033586bd

-- 1. Profiles
INSERT INTO profiles (profile_id, avatar, name, username, headline, bio, role, stats, views) VALUES
('0b663673-00f6-48c8-8731-36e4033586bd', 'https://example.com/avatars/family.jpg', '김지영', 'family_manager', '가족 스케줄 관리자', '가족 구성원들의 건강 관리, 학교 준비물, 일정 관리를 담당하고 있습니다. 아들 준호의 투약 일정과 음악 리코더 준비, 딸 서연의 체육복 준비 등 가족 모든 일정을 체계적으로 관리하고 있어요.', 'founder', '{"boards_created": 7, "family_members": 4, "daily_tasks": 15, "medicine_reminders": 1, "school_supplies": 3}', '{"profile_views": 89, "board_views": 456}');

-- 2. Boards
INSERT INTO boards (name, description, status, is_public, cover_image, settings, created_by) VALUES
('준호 건강 관리', '준호의 감기약 투약 일정과 건강 상태를 관리하는 보드입니다. 매일 저녁 7시 투약 알림이 설정되어 있어요.', 'active', false, 'https://example.com/covers/health-management.jpg', '{"theme": "blue", "notifications": true, "reminder_time": "19:00", "medicine_name": "감기약"}', '0b663673-00f6-48c8-8731-36e4033586bd'),
('학교 준비물 관리', '아이들의 학교 준비물과 시간표를 관리하는 보드입니다. 리코더, 체육복, 미술 준비물 등을 체크할 수 있어요.', 'active', false, 'https://example.com/covers/school-supplies.jpg', '{"theme": "green", "weekly_schedule": true, "supply_checklist": true}', '0b663673-00f6-48c8-8731-36e4033586bd'),
('가족 일정 공유', '가족 모든 구성원의 일정을 공유하고 관리하는 보드입니다. 병원 예약, 학교 행사, 가족 모임 등을 기록해요.', 'active', true, 'https://example.com/covers/family-calendar.jpg', '{"theme": "purple", "calendar_view": true, "shared_notifications": true}', '0b663673-00f6-48c8-8731-36e4033586bd'),
('집안일 분담', '가족 구성원별 집안일 분담과 완료 상태를 관리하는 보드입니다. 청소, 설거지, 빨래 등을 체크할 수 있어요.', 'active', false, 'https://example.com/covers/household-chores.jpg', '{"theme": "orange", "task_rotation": true, "completion_tracking": true}', '0b663673-00f6-48c8-8731-36e4033586bd'),
('주말 가족 활동', '주말과 휴일 가족 활동을 계획하고 관리하는 보드입니다. 놀이공원, 영화관, 공원 나들이 등을 계획해요.', 'active', true, 'https://example.com/covers/weekend-activities.jpg', '{"theme": "pink", "weather_check": true, "activity_suggestions": true}', '0b663673-00f6-48c8-8731-36e4033586bd'),
('특별한 날 준비', '생일, 기념일, 명절 등 특별한 날을 준비하는 보드입니다. 선물, 음식, 장식 등을 미리 계획할 수 있어요.', 'template', false, 'https://example.com/covers/special-events.jpg', '{"theme": "gold", "event_templates": true, "gift_ideas": true}', '0b663673-00f6-48c8-8731-36e4033586bd'),
('아이들 성장 기록', '아이들의 성장 과정과 기록을 관리하는 보드입니다. 키, 몸무게, 학습 진도, 특별한 순간들을 기록해요.', 'archived', false, 'https://example.com/covers/growth-record.jpg', '{"theme": "teal", "growth_charts": true, "milestone_tracking": true}', '0b663673-00f6-48c8-8731-36e4033586bd');

-- 3. Board Members
INSERT INTO board_members (board_id, user_id, role) VALUES
-- 준호 건강 관리 보드
((SELECT board_id FROM boards WHERE name = '준호 건강 관리' LIMIT 1), '0b663673-00f6-48c8-8731-36e4033586bd', 'owner'),

-- 학교 준비물 관리 보드
((SELECT board_id FROM boards WHERE name = '학교 준비물 관리' LIMIT 1), '0b663673-00f6-48c8-8731-36e4033586bd', 'owner'),

-- 가족 일정 공유 보드
((SELECT board_id FROM boards WHERE name = '가족 일정 공유' LIMIT 1), '0b663673-00f6-48c8-8731-36e4033586bd', 'owner'),

-- 집안일 분담 보드
((SELECT board_id FROM boards WHERE name = '집안일 분담' LIMIT 1), '0b663673-00f6-48c8-8731-36e4033586bd', 'owner'),

-- 주말 가족 활동 보드
((SELECT board_id FROM boards WHERE name = '주말 가족 활동' LIMIT 1), '0b663673-00f6-48c8-8731-36e4033586bd', 'owner'),

-- 특별한 날 준비 보드
((SELECT board_id FROM boards WHERE name = '특별한 날 준비' LIMIT 1), '0b663673-00f6-48c8-8731-36e4033586bd', 'owner'),

-- 아이들 성장 기록 보드
((SELECT board_id FROM boards WHERE name = '아이들 성장 기록' LIMIT 1), '0b663673-00f6-48c8-8731-36e4033586bd', 'owner');

-- 4. Board Invites
INSERT INTO board_invites (board_id, invited_by, email, role, token, expires_at) VALUES
-- 할머니를 준호 건강 관리 보드에 초대
((SELECT board_id FROM boards WHERE name = '준호 건강 관리' LIMIT 1), '0b663673-00f6-48c8-8731-36e4033586bd', 'grandma@family.com', 'viewer', 'health_board_invite_token_123', NOW() + INTERVAL '7 days'),
-- 이웃 엄마를 학교 준비물 관리 보드에 초대
((SELECT board_id FROM boards WHERE name = '학교 준비물 관리' LIMIT 1), '0b663673-00f6-48c8-8731-36e4033586bd', 'neighbor.mom@example.com', 'member', 'school_board_invite_token_456', NOW() + INTERVAL '7 days'),
-- 할아버지를 가족 일정 공유 보드에 초대
((SELECT board_id FROM boards WHERE name = '가족 일정 공유' LIMIT 1), '0b663673-00f6-48c8-8731-36e4033586bd', 'grandpa@family.com', 'member', 'family_schedule_invite_token_789', NOW() + INTERVAL '7 days'),
-- 육아 도우미를 집안일 분담 보드에 초대
((SELECT board_id FROM boards WHERE name = '집안일 분담' LIMIT 1), '0b663673-00f6-48c8-8731-36e4033586bd', 'helper@family.com', 'member', 'household_invite_token_abc', NOW() + INTERVAL '7 days'),
-- 친구 가족을 주말 가족 활동 보드에 초대
((SELECT board_id FROM boards WHERE name = '주말 가족 활동' LIMIT 1), '0b663673-00f6-48c8-8731-36e4033586bd', 'friend.family@example.com', 'member', 'weekend_activity_invite_token_def', NOW() + INTERVAL '7 days');

-- 5. Follows (현재는 단일 사용자이므로 follows 관계 없음)
-- 추후 가족 구성원이 개별 계정을 가지게 되면 여기에 팔로우 관계를 추가할 수 있습니다.

-- Re-enable foreign key checks
SET session_replication_role = DEFAULT;

-- Update table statistics for optimal performance
ANALYZE boards;
ANALYZE board_members;
ANALYZE board_invites;
ANALYZE profiles;

-- Create composite primary keys for bridge tables
ALTER TABLE board_members ADD CONSTRAINT board_members_pkey PRIMARY KEY (board_id, user_id); 