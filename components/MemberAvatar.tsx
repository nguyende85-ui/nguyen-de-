
import React from 'react';
import { Member } from '../types';

interface MemberAvatarProps {
  member: Member;
}

const MemberAvatar: React.FC<MemberAvatarProps> = ({ member }) => {
  const initial = member.name.charAt(0).toUpperCase();
  return (
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${member.avatarColor}`}
      title={member.name}
    >
      {initial}
    </div>
  );
};

export default MemberAvatar;
   