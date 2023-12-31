"""empty message

Revision ID: c8e7badfcc97
Revises: 913c04e037cf
Create Date: 2023-08-06 15:23:55.923385

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'c8e7badfcc97'
down_revision = '913c04e037cf'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('review', schema=None) as batch_op:
        batch_op.alter_column('category',
               existing_type=postgresql.ENUM('activity', 'product', 'trip', name='myenum'),
               type_=sa.String(length=250),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('review', schema=None) as batch_op:
        batch_op.alter_column('category',
               existing_type=sa.String(length=250),
               type_=postgresql.ENUM('activity', 'product', 'trip', name='myenum'),
               existing_nullable=True)

    # ### end Alembic commands ###
